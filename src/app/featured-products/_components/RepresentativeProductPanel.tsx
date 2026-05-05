"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { RepresentativeProduct } from "./representative-products";

const VIEWPORT = { once: true, amount: 0.32 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

type RepresentativeProductPanelProps = {
  product: RepresentativeProduct;
  priority?: boolean;
};

export function RepresentativeProductPanel({
  product,
  priority = false,
}: RepresentativeProductPanelProps) {
  const reduceMotion = useReducedMotion();

  /** 뷰 진입: 확대된 상태에서 기본 크기로 자연스럽게 안정 */
  const imagePopTransition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 180,
        damping: 30,
        mass: 1,
      };

  const scaleInVariants = {
    hidden: reduceMotion ? { scale: 1 } : { scale: 1.2 },
    visible: {
      scale: 1,
      transition: imagePopTransition,
    },
  };

  const textVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.11,
        delayChildren: reduceMotion ? 0 : 0.22,
      },
    },
  };

  const lineVariants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.56, ease: EASE },
    },
  };

  return (
    <div className="group relative isolate flex h-full min-h-0 w-full overflow-hidden bg-[#d8dbe0] text-white">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={scaleInVariants}
      >
        <Image
          src={product.imageUrl}
          alt={`${product.title} 이미지`}
          fill
          className="object-cover object-center grayscale-[18%] transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={priority}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/22 transition-colors duration-500 group-hover:bg-black/12" />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,24,0.02)_0%,rgba(6,11,24,0.08)_42%,rgba(6,11,24,0.62)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_12%_100%,rgba(255,255,255,0.18),transparent_46%)] opacity-80"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mt-auto w-full px-7 pb-9 sm:px-10 sm:pb-12 lg:px-8 xl:px-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={textVariants}
      >
        <motion.p
          className="text-sm font-semibold tracking-tight text-white/88 sm:text-base"
          variants={lineVariants}
        >
          {product.category}
        </motion.p>
        <motion.h3
          className="mt-1 text-[clamp(2.5rem,10vw,4rem)] leading-[1] font-bold text-white sm:text-[clamp(3.25rem,8vw,5rem)] lg:text-[clamp(3rem,4.9vw,5.25rem)]"
          variants={lineVariants}
        >
          {product.title}
        </motion.h3>
        <motion.p
          className="mt-3 max-w-md text-sm leading-7 text-white/78 transition-colors duration-300 group-hover:text-white/92 sm:text-base"
          variants={lineVariants}
        >
          {product.description}
        </motion.p>
      </motion.div>
    </div>
  );
}
