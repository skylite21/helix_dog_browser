import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BreedListContext from './BreedListContext';

const BreedListPage = () => {
  const [breedListContext] = useContext(BreedListContext);
  return (
    <div className='breed-list'>
      {breedListContext.map((breedListItem, index) => (
        <Link className='breed-list-item' key={index} to={`/breed/${breedListItem}`}>
          {breedListItem}
        </Link>
      ))}
      Breed List Page
    </div>
  );
};

// another way of accessing the context, which is the only way to do if we would be in
// a class component...
// const ListPage = () => {
//   return (
//     <div className='breed-list'>
//       <BreedListContext.Consumer>
//         {([breedListContext]) =>
//           breedListContext.map((breedListItem, index) => (
//             <Link className='breed-list-item' key={index} to={`/breed/${breedListItem}`}>
//               {breedListItem}
//             </Link>
//           ))
//         }
//       </BreedListContext.Consumer>
//     </div>
//   );
// };

export default BreedListPage;
