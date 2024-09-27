import BookJson from './BookStore.book.json' assert { type: "json" };
import Book from './Src/Models/Book.model.js';

export const seedBooksData = async () => {
    try {
        //connection to the database
    //query 
    await Book.deleteMany({});
    await Book.insertMany(BookJson);
    console.log("Data seeded successfully");

    //dicsonnect
    } catch (error) {
        console.log("Error: ", error);
    }
}


// command to seed the data
// node src/index.js --seed