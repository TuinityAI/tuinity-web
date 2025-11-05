import * as motion from "motion/react-client";
import Link from "next/link";

export function Brand() {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href="/" className="select-none">
        <span className="font-glitz text-3xl">Tuinity</span>
      </Link>
    </motion.div>
  );
}
