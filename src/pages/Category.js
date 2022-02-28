import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/layout/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference
        const listingsRef = collection(db, 'listings');

        //Create a query
        const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10));

        //execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          //   console.log(doc.data());
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>{params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}
export default Category;

// steps
//1. fetch data from database
//2. set component level states for listings and loading
//3. initialize params
//4. declare useEffect to fetch data
// 4.1 try catch block
// 4.2 write request
//5. run fetch function
