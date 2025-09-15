const cards=document.querySelector(".cards")
const search=document.querySelector('form input[type="search"]')
const select=document.querySelector('select')
class Book{
    static nextId=1
    #id
    #title
    #author
    #category
    #isAvailable
    constructor(title,author,category,isAvailable){
        this.#id=Book.nextId++
        this.#title=title
        this.#author=author
        this.#category=category
        this.#isAvailable=isAvailable
    }
    setTitle(title){
        this.#title=title
    }
    getTitle(){
        return this.#title
    }
    setId(id){
        this.#id=id
    }
    getId(){
        return this.#id
    }
    setAuthor(author){
        this.#author=author
    }
    getAuthor(){
        return this.#author
    }
    setCategory(category){
        this.#category=category
    }
    getCategory(){
        return this.#category
    }
    setIsAvailable(isAvailable){
        this.#isAvailable=isAvailable
    }
    getIsAvailable(){
        return this.#isAvailable
    }
    displayInfo(){
        return `This book title is ${this.#title},it's author is ${this.#author}, it belongs to ${this.#category} category it is ${this.#isAvailable?"available":"not available"}`
    }

}
class ReferenceBook extends Book{
    #locationCode
    constructor(title,author,category,isAvailable,locationCode){
        super(title,author,category,isAvailable)
        this.#locationCode=locationCode
    }
    setLocationCode(locationCode){
        this.#locationCode=locationCode
    }
    getLocationCode(){
        return this.#locationCode
    }
    displayInfo(){
        return `This book title is ${this.getTitle()},it's author is ${this.getAuthor()}, it belongs to ${this.getCategory()} category it is ${this.getIsAvailable()?"available":"not available"} and it located in roof ${this.#locationCode}`
    }
}

class Library{
    #books=[]
    #allBooks=[]
    getBooks(){
        return this.#books
    }
    setBooks(books){
        this.#books=books
    }
    getAllBooks(){
        return this.#allBooks
    }
    setAllBooks(allBooks){
        this.#allBooks=allBooks
    }
    addBook(book){
        this.#books.push(book)
        this.#allBooks.push(book)
    }
    removeBook(id){
        this.#books=this.#books.filter((book)=>{
            return book.getId()!=id
        })
        this.#allBooks=this.#allBooks.filter((book)=>{
            return book.getId()!=id
        })
        read(this.#books)
    }
    searchBooks(text){ 
        const res=text.trim().toLowerCase(); 
        if (res=="") {
            read(this.#books)
        }
        else{
            this.#books=this.#books.filter((book)=>{
            return book.getAuthor().toLowerCase().includes(res)||book.getTitle().toLowerCase().includes(res) 
        })
        read(this.#books)
        }
    }
    filterByCategory(sort){
        if (sort==="all") {
            this.#books = this.#allBooks
            read(this.#books)
        }
        else{
            this.#books=this.#allBooks.filter((book)=>{
            return book.getCategory().toLowerCase()==sort
            })
            read(this.#books)
        }
    }
    toggleAvailability(id){
        const book=this.#books.find((book)=>{
            return book.getId()==id
        })
        book.setIsAvailable(!book.getIsAvailable())
        read(this.#books)
    }
}
let book1=new Book("Shadows of the tale","Lina Star","Literature",true)
let book2=new Book("World without limits","Adam Sky","Scientific",true)
let book3=new Book("Little rainbow","Sara Moon","Children",false)
let book4=new Book("Secret of the magic seed","Sara Moon","Children",true)
let book5=new Book("Song of the clouds","Lina Star","Literature",false)
let book6=new Book("Between the lines","Noah Bright","Literature",true)
let book7=new Book("Spark of an idea","Adam Sky","Scientific",false)
let book8=new Book("Kingdom of Bubbles","Jony Dom","Children",true)
let book9=new Book("Edge of dream","Noah Bright","Literature",false)
let book10=new Book("Memory of the rain","Jony Dom","Children",true)
let book11=new Book("Journey into the atom","Omar light","Scientific",true)
let book12=new Book("Trip to Island","Omar light","Scientific",false)
let bookWithReference1=new ReferenceBook("Talk to the clouds","Lina Star","Literature",false,"2/4")
let bookWithReference2=new ReferenceBook("Walk on the planet","Adam Sky","Scientific",true,"4/7")
let bookWithReference3=new ReferenceBook("Baby on the school","Lina Star","Children",true,"9/1")
let bookWithReference4=new ReferenceBook("Child on the land","Lina Star","Children",false,"5/2")
let bookWithReference5=new ReferenceBook("Flying to the top","Noah Bright","Literature",true,"3/2")
let library=new Library()
let bookObjects=[book1,book2,book3,book4,book5,book6,book7,book8,book9,book10,book11,book12,bookWithReference1,bookWithReference2,
    bookWithReference3,bookWithReference4,bookWithReference5
]
bookObjects.forEach((element)=>{
    library.addBook(element)
})
let infoBook=book6.displayInfo()
let infoBookWithReference=bookWithReference1.displayInfo()
//display books information
console.log(infoBook)
console.log(infoBookWithReference)
// Function to shows books
const read=(booksShowed)=>{ 
    cards.innerHTML=""
    for (let i = 0; i < booksShowed.length; i++) {
    cards.innerHTML+=`<div class="card ${(booksShowed[i].getIsAvailable())?"available":""}">
            <h2>Title : ${booksShowed[i].getTitle()}</h2>
            <h3>Author : ${booksShowed[i].getAuthor()}</h3>
            <h4>Category : ${booksShowed[i].getCategory()}</h4>
            <p>Availability : <span>${(booksShowed[i].getIsAvailable())?"Available":"Not available"}</span></p>
            <button class="btn" onclick="library.toggleAvailability(${booksShowed[i].getId()})">press to change</button>
        </div>`
    }
}
library.removeBook(1) //Delete this book 
const booksToShow=library.getBooks()
read(booksToShow) //Show all books
let selectValue
let searchValue
select.addEventListener("change",()=>{
    selectValue=select.value
    searchValue=search.value
    library.filterByCategory(selectValue)
    library.searchBooks(searchValue)
    }
)
search.addEventListener("input",()=>{
    selectValue=select.value
    searchValue=search.value
    library.filterByCategory(selectValue)
    library.searchBooks(searchValue)
    }
)