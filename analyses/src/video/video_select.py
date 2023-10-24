import psycopg2

def select_video(db_params, selected_columns=None):
    connection = None  # Initialize the connection outside the try block
    rows = []

    try:
        # Establish a connection to the database
        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        if selected_columns is None:
            # If no specific columns are provided, select all columns
            cursor.execute("SELECT * FROM videos")
        else:
            # If specific columns are provided, generate the SQL query dynamically
            column_list = ", ".join(selected_columns)
            query = f"SELECT {column_list} FROM videos"
            cursor.execute(query)

        # Fetch the rows
        rows = cursor.fetchall()

    except (Exception, psycopg2.Error) as error:
        print(f"Error connecting to the database: {error}")

    finally:
        # Close the cursor and connection
        if connection:
            cursor.close()
            connection.close()
            print("Database connection is closed")

    return rows
