import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
