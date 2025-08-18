"use client"
import { motion } from "framer-motion";

export default function ChatButton({ ShowChat }) {

    return (
        <motion.div
            drag // يخلي العنصر قابل للسحب
            dragMomentum={false} // يوقف الطيران بعد السحب
            dragElastic={0.1} // درجة مرونة السحب (0 = جامد، 1 = مرن جدا)
            dragConstraints={{ top: 0, left: 0, right: 5, bottom: 500 }} // حدود الشاشة
            className="fixed cursor-pointer rounded-full sm:w-[70px] w-[60px] z-[1100] sm:h-[70px] h-[60px]"
            style={{ bottom: 700, right: 20 }} // مكانه الافتراضي
        >
            <motion.button
                onClick={() => ShowChat()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full shadow-lg bg-gradient-to-r from-[#fffaff] to-[#e7e6e7ad] mr-6 bg-cover text-white bg-[url('/animation/Live-chatbot.gif')] w-full h-full "
            >
            </motion.button>
        </motion.div>
    );
}
