import React from 'react';
import { Layout } from '../components/Layout';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';
import { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { motion } from 'framer-motion';

const images = [
	'/assets/gallery/1.jpeg',
    '/assets/gallery/2.jpeg',
    '/assets/gallery/3.jpeg',
    '/assets/gallery/4.jpeg',
    '/assets/gallery/5.jpeg',
    '/assets/gallery/6.jpeg',
    '/assets/gallery/7.jpeg',
    '/assets/gallery/8.jpeg',
    '/assets/gallery/9.jpeg',
    '/assets/gallery/10.jpeg',
    '/assets/gallery/11.jpeg',
    '/assets/gallery/12.jpeg',
    '/assets/gallery/13.jpeg',
    '/assets/gallery/14.jpeg',
    '/assets/gallery/15.jpeg',
    '/assets/gallery/16.jpeg',
    '/assets/gallery/17.jpeg',
    '/assets/gallery/18.jpeg',
    '/assets/gallery/19.jpeg',
    '/assets/gallery/20.jpeg',
    '/assets/gallery/21.jpeg',
    '/assets/gallery/22.jpeg',
    '/assets/gallery/23.jpeg',
    '/assets/gallery/24.jpeg'
];

const Gallery = () => {
	const [loadedImageNumber, setLoadedImageNumber] = useState(4);
	const [loadedImages, setLoadedImages] = useState(
		images.slice(0, loadedImageNumber)
	);
	const [imageInView, setImageInView] = useState({ img: '', i: 0 });

	const viewImage = (img, i) => {
		setImageInView({ img, i });
		console.log({ imageInView });
	};

	const imageAction = (action) => {
		let i = imageInView.i;

		if (action === 'next-img') {
			setImageInView({ img: images[i + 1], i: i + 1 });
		}

		if (action === 'previous-img') {
			setImageInView({ img: images[i - 1], i: i - 1 });
		}

		if (!action) {
			setImageInView({ img: '', i: 0 });
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			end={{ opacity: 0 }}
		>
			<Layout>
				<div className="h-[25vh] md:h-[30vh] text-white relative transition-all duration-300 ease-out">
					<Image
						src={'/assets/gallery/cover.jpg'}
						alt="Gallery Background"
						width={2000}
						height={2000}
						className="w-full h-full object-cover object-top"
						priority
					/>

					<div className="absolute top-0 bg-gray-800/60 h-full w-full flex flex-col items-center justify-center text-amber-500">
						<h3 className="font-bold uppercase text-3xl lg:text-4xl tracking-wider">
							Gallery
						</h3>
					</div>
				</div>

				{imageInView.img && (
					<div className="top-0 bottom-0 left-0 right-0 bg-black/90 fixed flex justify-center items-center overflow-hidden z-50">
						<TfiClose
							className="absolute top-5 right-5 sm:top-10 sm:right-10 btns cursor-pointer w-5 h-5 md:w-10 md:h-10"
							onClick={() => imageAction()}
						/>

						<button
							onClick={() => imageAction('previous-img')}
							disabled={imageInView.i === 0}
							className="z-20 arrows absolute left-5 md:left-10"
						>
							<SlArrowLeft className="w-7 h-7 md:w-14 md:h-14" />
						</button>

						<Image
							src={imageInView.img}
							width={1000}
							height={1000}
							alt={'Event'}
							priority
							className="w-auto max-w-[80%] max-h-[80%] md:max-w-[90%] md:max-h-[90%] z-10"
						/>

						<button
							onClick={() => imageAction('next-img')}
							disabled={imageInView.i === images.length - 1}
							className="z-20 arrows absolute right-5 md:right-10"
						>
							<SlArrowRight className="w-7 h-7 md:w-14 md:h-14" />
						</button>
					</div>
				)}

				<div>
					<div className="flex justify-center py-10 mb-5 bg-gray-100 uppercase text-lg">
						Showing{' '}
						<span className="text-amber-400 text-xl mx-1">
							{loadedImageNumber}
						</span>{' '}
						of
						<span className="text-amber-400 text-xl mx-1">
							{images.length}
						</span>{' '}
						images
					</div>

					<ResponsiveMasonry
						columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
						style={{ padding: 10 }}
					>
						<Masonry gutter="20px">
							{loadedImages.map((image, i) => (
								<Image
									key={i}
									src={image}
									width={2000}
									height={2000}
									alt={'Event'}
									priority
									className="w-[100%] block hover:opacity-80 transition-all duration-500 ease-in-out cursor-pointer"
									onClick={() => viewImage(image, i)}
								/>
							))}
						</Masonry>
					</ResponsiveMasonry>

					<div className="flex justify-center mt-5 py-10 bg-gray-100 space-x-5 lg:text-lg">
						<button
							onClick={() => {
								setLoadedImages(images.slice(0, 4));
								setLoadedImageNumber(4);
							}}
							disabled={loadedImageNumber === 4}
							className="disabled:text-gray-500 text-amber-400 hover:text-amber-600"
						>
							Reset
						</button>

						<span> | </span>

						<button
							onClick={() => {
								setLoadedImageNumber((prevNumber) => prevNumber * 2);
								setLoadedImages(images.slice(0, loadedImageNumber * 2));
							}}
							disabled={loadedImageNumber >= images.length}
							className="disabled:text-gray-500 text-amber-400 hover:text-amber-600"
						>
							Load More...
						</button>
					</div>
				</div>
			</Layout>
		</motion.div>
	);
};

export default Gallery;
