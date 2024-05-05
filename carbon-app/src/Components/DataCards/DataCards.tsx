import React from 'react';
import './DataCards.scss';


export default function DataCards({ children }: any) {
  return ( 
    <>
      <section className='datacard-information'>
        {children}
      </section>
    </>
  )
}