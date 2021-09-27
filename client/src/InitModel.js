import React from "react";
import { useFBX } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function InitModel() {
  const colorMap = useLoader(TextureLoader, "/Mat.3_Color_tu.jpg");
  //console.log(colorMap);
  const fbx = useFBX("combined_flair_t_pose.fbx");
  return <primitive object={fbx} dispose={null} />;
}
