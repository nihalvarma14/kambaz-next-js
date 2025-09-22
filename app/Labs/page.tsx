import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
     <h1>Labs</h1>
     <h2>Name : Venkata Sai Siva Nihalvarma Pericherla</h2>
     <h2>Section : 18616</h2>
     <h3><a href = "https://github.com/nihalvarma14/kambaz-next-js.git" id = "wd-github">Github repo link</a></h3>
     <h4><a href= "https://kambaz-next-js-8y4w.vercel.app/Account/Signin" id = "wd-kambaz">kambaz link</a></h4>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
     </ul>
   </div>
);}

