import React from "react";
import { useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function TextureImport() {
  const colorMap = useLoader(TextureLoader, "/Mat.3_Color_tu.jpg");
  console.log(colorMap);
  return <primitive object={colorMap} />;
}
