import css from "./SidebarNotes.module.css"
import Link from "next/link"

const categories = ["Work", "Todo", "Personal", "Meeting", "Shopping"]

const SidebarNotes = async () => {
    
    return (
    
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink}>
                    All notes
                </Link>
            </li>
            {categories.map((category)=> (
                <li key={category} className={css.menuItem}>
                    <Link href={`/notes/filter/${category}`} className={css.menuLink}>
                        {category}
                    </Link>
                </li>
            ))}
          </ul>
           
    )
}

export default SidebarNotes