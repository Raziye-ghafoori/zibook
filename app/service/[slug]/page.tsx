
import Image from "next/image";

const services = {
  haircut: {
    title: "کوتاهی مو",
    prices: [
      {
        title: "کوتاهی ساده",
        price: "20000-25000",
        image: {
          src: '/images/haircut/image2.jpg',
          alt: "کوتاهی ساده"
        }
      },
      { title: "کوتاهی حرفه‌ای", 
        price: "30000-35000" ,
       image: {
          src: '/images/haircut/image4.jpg',
          alt: "کوتاهی حرفه ای"
        }},
    ],
    samples: [
      {
        id: 1,
        img: "/images/haircut/image1.jpg",
        alt: "نمونه کار کوتاهی - مدل 1",
      },
      {
        id: 2,
        img: "/images/haircut/image2.jpg",
        alt: "نمونه کار کوتاهی - مدل 2",
      },
      {
        id: 3,
        img: "/images/haircut/image3.jpg",
        alt: "نمونه کار کوتاهی - مدل 3"
      },
      {
        id: 4,
        img: "/images/haircut/image4.jpg",
        alt: "نمونه کار کوتاهی - مدل 4"
      },
      {
        id: 5,
        img: "/images/haircut/image5.jpg",
        alt: "نمونه کار کوتاهی - مدل 5"
      }
    ],
  },

  color: {
    title: "رنگ مو",
    prices: [
      { title: "رنگ کامل", price: "50000-70000" ,
        image: {
          src: '/images/color/image4.webp',
          alt: "رنگ ساده "
        }
       },
      { title: "هایلایت", price: "80000-120000" ,
        image: {
          src: '/images/color/image1.webp',
          alt: " هایلات"
        }
      },
    ],
    samples: [
      {
        id: 1,
        img: "/images/color/image1.webp",
        alt: "نمونه کار رنگ مو 1",
      },
      {
        id: 2,
        img: "/images/color/image2.webp",
        alt: "نمونه کار رنگ مو 2",
      },
      {
        id: 3,
        img: "/images/color/image3.webp",
        alt: "نمونه کار رنگ مو 3",
      },
      {
        id: 4,
        img: "/images/color/image4.webp",
        alt: "نمونه کار رنگ مو 4",
      },
    ],
  },

  implant: {
    title: "کاشت",
    prices: [
      { title: "ناخن کوتاه", price: "5000-7000" ,
        image: {
          src: '/images/implant/image4.jpg',
          alt: "ناخن کوتاه"
        }
       },
      { title: "ناخن بلند", price: "100000-150000" ,
        image: {
          src: '/images/implant/image1.jpg',
          alt: "ناخن بلند"
        }
      },
    ],
    samples: [
      {
        id: 1,
        img: "/images/implant/image1.jpg",
        alt: "نمونه کار کاشت ناخن  1",
      },
      {
        id: 2,
        img: "/images/implant/image2.jpeg",
        alt: "نمونه کار کاشت ناخن  2",
      },
      {
        id: 3,
        img: "/images/implant/image3.webp",
        alt: "نمونه کار کاشت ناخن  3",
      },
      {
        id: 4,
        img: "/images/implant/image4.jpg",
        alt: "نمونه کار کاشت ناخن  4",
      },
      {
        id: 5,
        img: "/images/implant/image5.jpg",
        alt: "نمونه کار کاشت ناخن 5",
      },
    ],
  },

   makeup: {
    title: "میکاپ",
    prices: [
      { title: "لایت", price: "10000-15000" ,
        image: {
          src: '/images/makeup/image4.jpg',
          alt: "لایت"
        }
       },
      { title: "نود", price: "80000-120000" ,
        image: {
          src: '/images/makeup/image1.webp',
          alt: "نود"
        }
      },

    ],
    samples: [
      {
        id: 1,
        img: "/images/makeup/image1.webp",
        alt: "نمونه کار  میکاپ 1",
      },
      {
        id: 2,
        img: "/images/makeup/image2.webp",
        alt: "نمونه کار  میکاپ 2",
      },
      {
        id: 3,
        img: "/images/makeup/image3.webp",
        alt: "نمونه کار  میکاپ 3",
      },
      {
        id: 4,
        img: "/images/makeup/image4.jpg",
        alt: "نمونه کار میکاپ  4",
      },
    ],
  },
};




export default async function ServicePage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  return (
    <div className="w-full h-full ">
      <section className="flex flex-col justify-center mb-10">
        <div className="w-full  p-3 font-bold cursor-default text-rose-500 text-shadow-lg text-[25px]">
          قیمت ها
        </div>
        <hr className="text-gray-400" />
        <div className="gap-2 mx-5 overflow-x-auto overflow-y-hidden flex py-5 ">
          {service.prices.map((p, i) => (

            <div key={i} className=" shrink-0
          w-[150px] bg-pink-200 rounded-[10px] p-2  flex flex-col items-center justify-center">
              <Image src={p.image.src} alt={`${p.image.alt}`} className="rounded-lg w-50 h-50" width={200} height={200} />
              <h1>{service.prices[i].title}</h1>
              <div className="flex justify-around w-full">
                <span className="font-bold text-[20px]">{service.prices[i].price}</span>
                {/* <span className="line-through text-gray-500 ">25000</span> */}
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="flex flex-col justify-center" >
        <div className="w-full  p-3 font-bold cursor-default text-rose-500 text-shadow-lg text-[25px]">
          نمونه کار ها
        </div>
        <hr className="text-gray-400" />
        <div className="flex flex-wrap items-center justify-center  md:flex-row flex-col">
          {service.samples.map(p => {
            return (
              <div key={p.id} className="md:w-[30%] lg:w-[20%] w-full flex items-center justify-center">
                <Image className=" rounded-[20px] m-1 p-2 w-50 h-60" src={p.img} alt={`${p.alt}`} width={500} height={500} />
              </div>
            )
          })}
        </div>

      </section>
    </div>
  );
}
