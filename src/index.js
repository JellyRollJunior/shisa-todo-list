import "./styles.css";

console.log("hello world");

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}