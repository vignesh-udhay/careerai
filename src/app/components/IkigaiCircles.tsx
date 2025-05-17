import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface IkigaiCirclesProps {
  onStart: () => void;
  currentCategory?: "love" | "good" | "needs" | "paid" | null;
}

export default function IkigaiCircles({
  onStart,
  currentCategory,
}: IkigaiCirclesProps) {
  const getBackgroundColor = () => {
    switch (currentCategory) {
      case "love":
        return "#2ec4b6";
      case "good":
        return "#ffce3a";
      case "needs":
        return "#ff5ca7";
      case "paid":
        return "#ff7f3f";
      default:
        return "#ffffff";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 w-full h-full p-10"
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: getBackgroundColor() }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-[600px] h-full mx-auto flex items-center justify-center">
        {/* Top (What you love) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: currentCategory === "love" ? 2 : 1,
            opacity: currentCategory === "love" ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute left-1/2 top-[30px] -translate-x-1/2 w-[320px] h-[320px] bg-[#2ec4b6]/70 rounded-full flex items-center justify-center border-2 border-[#2ec4b6]"
          style={{ zIndex: 2 }}
        >
          <span className="text-white text-xl font-semibold drop-shadow">
            What you love
          </span>
        </motion.div>

        {/* Left (What you are good at) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: currentCategory === "good" ? 2 : 1,
            opacity: currentCategory === "good" ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute left-[30px] top-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#ffce3a]/70 rounded-full flex items-center justify-center border-2 border-[#ffce3a]"
          style={{ zIndex: 2 }}
        >
          <span className="text-white text-xl font-semibold drop-shadow text-center">
            What you are good at
          </span>
        </motion.div>

        {/* Right (What the world needs) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: currentCategory === "needs" ? 2 : 1,
            opacity: currentCategory === "needs" ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute right-[30px] top-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#ff5ca7]/70 rounded-full flex items-center justify-center border-2 border-[#ff5ca7]"
          style={{ zIndex: 2 }}
        >
          <span className="text-white text-xl font-semibold drop-shadow text-center">
            What the world needs
          </span>
        </motion.div>

        {/* Bottom (What you can be paid for) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: currentCategory === "paid" ? 2 : 1,
            opacity: currentCategory === "paid" ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute left-1/2 bottom-[30px] -translate-x-1/2 w-[320px] h-[320px] bg-[#ff7f3f]/70 rounded-full flex items-center justify-center border-2 border-[#ff7f3f]"
          style={{ zIndex: 2 }}
        >
          <span className="text-white text-xl font-semibold drop-shadow text-center">
            What you can be paid for
          </span>
        </motion.div>

        {/* Secondary labels */}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: currentCategory ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-[30px] top-[170px] text-black font-bold text-lg drop-shadow"
          style={{ zIndex: 3 }}
        >
          Passion
        </motion.span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: currentCategory ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute right-[30px] top-[170px] text-black font-bold text-lg drop-shadow"
          style={{ zIndex: 3 }}
        >
          Mission
        </motion.span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: currentCategory ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-[30px] bottom-[170px] text-black font-bold text-lg drop-shadow"
          style={{ zIndex: 3 }}
        >
          Profession
        </motion.span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: currentCategory ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute right-[30px] bottom-[170px] text-black font-bold text-lg drop-shadow"
          style={{ zIndex: 3 }}
        >
          Vocation
        </motion.span>

        {/* Center Ikigai label */}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: currentCategory ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-extrabold text-3xl drop-shadow-lg"
          style={{ zIndex: 4 }}
        >
          Ikigai
        </motion.span>

        {/* Center Start Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: currentCategory ? 0 : 1,
            opacity: currentCategory ? 0 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 5 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={onStart}
              className="cursor-pointer bg-black text-white px-10 py-7 text-xl font-semibold rounded-full shadow-lg hover:bg-black"
            >
              Start Your Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
