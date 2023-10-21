import psycopg2


def create_tags_corpus(db_params, tags_query):
    # Create an array to store all tags
    corpus = []

    # Create a cursor
    connection = psycopg2.connect(**db_params)
    cursor = connection.cursor()

    # Read the SQL query from the file
    with open(tags_query, "r") as file:
        query = file.read()

    # Run the SQL query
    cursor.execute(query)
    # Fetch the results
    results = cursor.fetchall()

    # Iterate through the results and append tags to the corpus
    for row in results:
        for tags in row:
            for tag in tags:
                corpus.append(tag)

    # Close the cursor and connection
    cursor.close()
    connection.close()

    return corpus
