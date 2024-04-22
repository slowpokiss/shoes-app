import { Await, useLoaderData, useAsyncValue } from "react-router-dom"
import { Suspense } from "react";
import Loader from "../components/Loader";
import { singleCardInterface } from "../interface/interface";


async function getSingleCard(id: number) {
  const response = await fetch(`http://localhost:7070/api/items/${id}`);
  return response.json();
}

export const oneCardLoader = async ({params}: any) => {
  const id = params.id
  const oneCard = getSingleCard(id);
  return { oneCard }; 
}

const OneCardConstructor = () => {
  const oneCard = useAsyncValue();


  return (
    <></>
  )
}

export default function SingleCard() {
  const { oneCard } = useLoaderData();


  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img
                src="../img/banner.jpg"
                className="img-fluid"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="catalog">
              <Suspense fallback={<Loader />}>
                  <Await resolve={oneCard}>
                    <OneCardConstructor />
                  </Await>
                </Suspense>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

