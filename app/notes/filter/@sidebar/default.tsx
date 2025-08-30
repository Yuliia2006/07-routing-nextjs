import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map(tag => {
        const href = `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}




// export default async function SidebarNotes() {
//   return (
//     <ul className={css.menuList}>
//       <li className={css.menuItem}>
//         <Link href={`/notes/filter/All`} className={css.menuLink}>
//           All notes
//         </Link>
//       </li>
//       {TAGS.map((tag) => (
//         <li key={tag} className={css.menuItem}>
//           <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
//             {tag}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }





