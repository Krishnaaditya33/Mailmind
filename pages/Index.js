"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Canvas className="absolute top-0 left-0 w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Sphere args={[1.2, 64, 64]} position={[0, 0, -3]}>
          <MeshDistortMaterial color="#ff007f" distort={0.5} speed={2} />
        </Sphere>
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Smart Gmail Manager
        </motion.h1>
        <motion.p 
          className="text-lg max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Organize your Gmail inbox effortlessly with AI-powered automation.
        </motion.p>
        <motion.div className="mt-6 flex space-x-4">
          <Link
            href="/features"
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold text-lg hover:bg-blue-500 transition"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="bg-green-600 px-6 py-3 rounded-lg text-white font-semibold text-lg hover:bg-green-500 transition"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="bg-yellow-600 px-6 py-3 rounded-lg text-white font-semibold text-lg hover:bg-yellow-500 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold text-lg hover:bg-red-500 transition"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
