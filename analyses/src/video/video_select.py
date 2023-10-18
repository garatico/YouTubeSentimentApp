import psycopg2


def select_video(db_params):
    connection = None  # Initialize the connection outside the try block

    try:
        # Establish a connection to the database
        connection = psycopg2.connect(**db_params)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Execute SQL queries
        cursor.execute("SELECT * FROM videos")  # Replace with your SQL query

        # Fetch and print results
        records = cursor.fetchall()
        for row in records:
            print(row)

    except (Exception, psycopg2.Error) as error:
        print(f"Error connecting to the database: {error}")

    finally:
        # Close the cursor and connection
        if connection:
            cursor.close()
            connection.close()
            print("Database connection is closed")
