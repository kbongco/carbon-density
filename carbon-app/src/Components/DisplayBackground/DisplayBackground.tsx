import React from "react";
import './DisplayBackground.scss';

export default function DisplayBackground({ children }: any) {
  return ( 
    <>
      <section className='carbon-intensity-information-info'>
        {children}
      </section>
    </>
  )
}