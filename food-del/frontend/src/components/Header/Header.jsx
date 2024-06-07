import React from 'react';
import pizza from "../../assets/pizza.png";
const Header = () => {
    return (
        <section className="hero flex flex-col md:flex-row items-center justify-between md:mt-4 px-4 md:px-8 lg:px-16">
      <div className="py-8 md:py-12 md:w-1/2 relative left-10">
        <h1 className="text-6xl leading-tight font-bold">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm md:text-base lg:text-lg font-semibold">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-4 text-sm md:text-base">
          <button className="flex items-center border-2 border-primary text-primary gap-2 px-6 py-3 rounded-full font-semibold transform transition-transform hover:scale-105">
            Learn more
          </button>
        </div>
      </div>
      <div className="relative hidden md:block md:w-1/2 lg:w-2/5 right-10 ">
        <img src={pizza} alt="Pizza" className="w-full h-auto object-contain" />
      </div>
    </section>
    );
};

export default Header;
