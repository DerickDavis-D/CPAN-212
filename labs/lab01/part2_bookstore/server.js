/*
home
about
contact
login
register
details
search page

*/

import { Console } from "console";
import http from "http";
import fs from "fs";
import path from "path";
const app = http.createServer((req, res) =>{
    // Server Home Page
    if(req.url === '/' || req.url === '/home'){
        const homewebpage = fs.readFileSync(path.join('html', 'home.html'));
        res.end(homewebpage);
    }
    // Server about Page
    else if(req.url ==="/about") {
        const aboutpage = fs.readFileSync(path.join('html', 'about.html'));
        res.end(aboutpage);    
    }
    else if(req.url === '/' || req.url ==="/categories") {
        const aboutpage = fs.readFileSync(path.join('html', 'home.html'));
        res.end(aboutpage);    
    }
     // Server Contact Page
     else if (req.url === '/contact') {
        const contactpage = fs.readFileSync(path.join('html', 'contact.html'));
        res.end(contactpage);
    }
    // Server Login Page
    else if (req.url === '/login') {
        const loginpage = fs.readFileSync(path.join('html', 'login.html'));
        res.end(loginpage);
    }
    // Server Register Page
    else if (req.url === '/register') {
        const registerpage = fs.readFileSync(path.join('html', 'register.html'));
        res.end(registerpage);
    }
        // Serve Search Page
    else if (req.url === '/search') {
        const searchpage = fs.readFileSync(path.join('html', 'search.html'));
        res.end(searchpage);
    }
       else {
        const webpage = fs.readFileSync(path.join('html', '404.html'));
        res.end(webpage);
    }
});
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})