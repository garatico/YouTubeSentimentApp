import psycopg2

def select_video(db_params, selected_columns=None):
    connection = None
    result = {'columns': [], 'data': []}

    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        if selected_columns is None:
            cursor.execute("SELECT * FROM videos")
        else:
            column_list = ", ".join(selected_columns)
            query = f"SELECT {column_list} FROM videos"
            cursor.execute(query)

        # Fetch column names from the cursor
        result['columns'] = [desc[0] for desc in cursor.description]

        # Fetch the data rows
        result['data'] = cursor.fetchall()

    except (Exception, psycopg2.Error) as error:
        print(f"Error connecting to the database: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()
            print("Database connection is closed")

    return result
