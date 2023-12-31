import psycopg2

def insert_multiple_video(db_params, videos_manifest, video_raw_directory, return_all_video_section_data, parse_all_video_section_data):
    # Loop through videos_manifest and insert each video into the database
    for video_file in videos_manifest:
        file_path = f"{video_raw_directory}{video_file}"
        full_video = return_all_video_section_data(file_path)
        full_video_columns = parse_all_video_section_data(full_video)
        insert_video(db_params, full_video_columns)

def insert_video(db_params, column_values):
    try:
        # Establish a connection to the database
        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Create a dynamic SQL query for INSERT
        columns = ', '.join(column_values.keys())
        values = ', '.join(['%s' for _ in column_values.keys()])
        sql = f'INSERT INTO videos ({columns}) VALUES ({values})'

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
