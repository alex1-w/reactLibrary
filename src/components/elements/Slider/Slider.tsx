import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { booksData } from '../../../data/MainPage.data';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper';
import styles from './Slider.module.scss'
import { BookSliderItem } from '../BookSliderItem/BookSliderItem';
import SlidePrevButton from './SlidePrevButton/SlidePrevButton';
import SlideNextButton from './SlideNextBtn/SlideNextBtn';

const breakpoints = {
    1500: { slidesPerView: 6 },
    1200: { slidesPerView: 4.5, spaceBetween: 10 },
    1100: { slidesPerView: 4, spaceBetween: 10 },
    820: { slidesPerView: 3.5, spaceBetween: 10 },
    770: { slidesPerView: 3, spaceBetween: 5 },
    610: { slidesPerView: 2.5, spaceBetween: 5 },
    500: { slidesPerView: 2, spaceBetween: 5 },
    400: { slidesPerView: 1.5 },
    330: { slidesPerView: 1.2 },
    220: { slidesPerView: 1 },
}

export const Slider = () => {

    return (
        <div className={styles.mainBlock}>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={4}
                grabCursor={true}
                freeMode
                className={styles.swiperBlock}
                watchSlidesProgress
                breakpoints={breakpoints}
            >
                {booksData.slice(0, 12).map(card => (
                    <SwiperSlide key={card.id} >
                        <BookSliderItem book={card} />
                    </SwiperSlide>
                ))}

                <span slot="container-end" className={styles.sliderNavigation}>

                    <SlidePrevButton />
                    <SlideNextButton />

                </span>
            </Swiper>

        </div >
    )
}