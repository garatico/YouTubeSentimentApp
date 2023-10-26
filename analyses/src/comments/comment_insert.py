import psycopg2

def insert_pages_of_comments(file_paths, db_params, return_all_comment_thread_data):
    for file_path in file_paths:
        comments_full = return_all_comment_thread_data(file_path)
        for comment in comments_full:
            insert_comment(db_params, comment)

def insert_comment(db_params, column_values):
    try:
        # Establish a connection to the database
        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Create a dynamic SQL query for INSERT
        columns = ', '.join(column_values.keys())
        values = ', '.join(['%s' for _ in column_values.keys()])
        sql = f'INSERT INTO comments ({columns}) VALUES ({values})'

        # Extract values from the dictionary
        values = [column_values[column] for column in column_values.keys()]

        # Execute the dynamic SQL query
        cursor.execute(sql, values)

        # Commit the transaction
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print(f"Error connecting to the database: {error}")

    finally:
        # Close the cursor and connection
        if connection:
            cursor.close()
            connection.close()
            print("Database connection is closed")
