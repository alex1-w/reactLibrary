import styles from './PromoSwiper.module.scss'
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import promoSliderItem from '../../images/sliderThreeItem.png'
import promoSliderBack from '../../images/background.png'
import { useState } from 'react';

const images = [
    { image: promoSliderItem, name: 'Комплект книг Марка Мэнсона', },
    { image: promoSliderItem, name: 'Комплект книг Виктора Пелевина' },
    { image: promoSliderItem, name: 'Комплект книг Курта Воннегута' }]



export const PromoSwiper = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={styles.main}>

            <img src={promoSliderBack} alt="" className={styles.back} />

            <Swiper
                className={styles.swiperBlock}
                modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}
            >
                {images.map(item => (
                    <SwiperSlide className={styles.swipeItem} key={item.name} >
                        <img src={item.image} alt={item.name} />
                    </SwiperSlide>
                ))}
                <Swiper
                    modules={[Thumbs]}
                    watchSlidesProgress
                >
                </Swiper>
            </Swiper>

        </div >
    )
}