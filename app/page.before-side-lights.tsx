"use client";
import * as THREE from "three";
import { Suspense, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import { royalZen } from "./styles/royalZen";

import { useState } from "react";
import { Chess } from "chess.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox } from "@react-three/drei";

type Square = import("chess.js").Square;

const names: Record<string, string> = {
p: "P", r: "R", n: "N", b: "B", q: "Q", k: "K"
};






const CHESS_MODELS: Record<string, string> = {
  k: "01_king",
  q: "03_queen",
  b: "05_bishop",
  n: "07_knight",
  r: "09_rook",
  p: "11_pawn",
};

function PremiumModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const copy = scene.clone(true);
    copy.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.material = Array.isArray(object.material)
          ? object.material.map((m) => m.clone())
          : object.material.clone();
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    const bounds = new THREE.Box3().setFromObject(copy);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 0.85 / Math.max(size.x, size.z, 0.001);
    copy.position.set(-center.x, -bounds.min.y, -center.z);
    const holder = new THREE.Group();
    holder.add(copy);
    holder.scale.setScalar(scale);
    return holder;
  }, [scene]);
  return <primitive object={model} />;
}

function Piece({ type, color, x, z, onClick }: {
  type: string;
  color: string;
  x: number;
  z: number;
  onClick: () => void;
}) {
  const base = CHESS_MODELS[type];
  const number = Number(base.slice(0, 2)) + (color === "b" ? 1 : 0);
  const filename = String(number).padStart(2, "0") + base.slice(2);
  const url = "/models/chess/" + filename + "_" +
    (color === "w" ? "light" : "dark") + ".glb";

  return (
    <group position={[x, 0.09, z]}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}>
      <Suspense fallback={null}>
        <PremiumModel url={url} />
      </Suspense>
    </group>
  );
}

function Board({ game, selected, play }: {
game: Chess; selected: Square | null;
play: (square: Square) => void;
}) {
const squares = [];
for (let rank = 0; rank < 8; rank++) {
for (let file = 0; file < 8; file++) {
        const square = `${"abcdefgh"[file]}${8-rank}` as Square;
        const piece = game.get(square);
        const x = file - 3.5;
const z = rank - 3.5;
const light = (rank + file) % 2 === 0;
squares.push(
<group key={square}>
<mesh
position={[x, 0, z]}
onClick={(e) => { e.stopPropagation(); play(square); }}
>
<boxGeometry args={[1, 0.16, 1]}/>
<meshPhysicalMaterial
      color={selected === square ? "#E6B66E" : (file + rank) % 2 === 0 ? "#C18A52" : "#24110B"}
      roughness={0.24}
      metalness={0.08}
      clearcoat={0.75}
      clearcoatRoughness={0.15}
    />
</mesh>
{piece && (
<Piece
type={piece.type}
color={piece.color}
x={x}
z={z}
onClick={() => play(square)}
/>
)}
</group>
);
}
}
 return (
<>
<color attach="background" args={[royalZen.background]}/>

      {/* royal-zen-light */}
      <ambientLight intensity={0.75} color="#ffe8c2" />
      <directionalLight
        position={[3, 9, 5]}
        intensity={2.1}
        color="#ffd49a"
      />
      <pointLight
        position={[-4, 5, 2]}
        intensity={28}
        color="#ffbd70"
      />
<ambientLight intensity={1.05}/>
<directionalLight position={[4, 10, 5]} intensity={2.6}/>
<pointLight position={[-5, 5, -3]} intensity={45} color="#7ec9ff"/>
<mesh position={[0, -0.075, 0]}>
  <boxGeometry args={[8.22, 0.035, 8.22]} />
  <meshStandardMaterial color="#c89545" metalness={0.4} roughness={0.12} />
</mesh>
<RoundedBox args={[8.5, 0.4, 8.5]} radius={0.12} position={[0, -0.28, 0]}>
<meshStandardMaterial color="#27170f" metalness={0.4} roughness={0.12}/>
</RoundedBox>

      {/* CHESS_ARENA_THICK_SIDE */}
      <RoundedBox
        args={[8.55, 0.78, 8.55]}
        radius={0.08}
        smoothness={5}
        position={[0, -0.51, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#160B09"
          roughness={0.08}
          metalness={0.22}
          clearcoat={1}
 clearcoatRoughness={0.04}
          emissive="#382018"
          emissiveIntensity={0.08}
        />
      </RoundedBox>
      {/* CHESS_ARENA_BOTTOM_EDGE */}
      {[
        [0, -0.895, 4.277, 8.25, 0.018, 0.012],
        [0, -0.895, -4.277, 8.25, 0.018, 0.012],
        [4.277, -0.895, 0, 0.012, 0.018, 8.25],
        [-4.277, -0.895, 0, 0.012, 0.018, 8.25],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={"bottom-gold-" + i} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial
            color="#C59A62"
            emissive="#A06B36"
            emissiveIntensity={0.32}
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
      ))}


      <RoundedBox
        args={[8.62, 0.055, 8.62]}
        radius={0.025}
        smoothness={4}
        position={[0, -0.13, 0]}
      >
        <meshStandardMaterial
          color="#B77B37"
          metalness={0.7}
          roughness={0.23}
        />
      </RoundedBox>

 {squares}
<OrbitControls  
enablePan={false}  
minDistance={5.5}  
maxDistance={15}  
minPolarAngle={0.35}  
maxPolarAngle={1.35}  
/>
</>
);
}

export default function Home() {
const [game, setGame] = useState(() => new Chess());
const [selected, setSelected] = useState<Square | null>(null);
const [message, setMessage] = useState("White to move");
const [fee, setFee] = useState("20");

function play(square: Square) {
const piece = game.get(square);
if (!selected) {
if (piece?.color === game.turn()) setSelected(square);
return;
}
const next = new Chess(game.fen());
try {
next.move({ from: selected, to: square, promotion: "q" });
setGame(next);
setMessage(next.isCheckmate()
? "Checkmate!"
: next.isDraw()
? "Draw!"
: next.turn() === "w" ? "White to move" : "Black to move");
setSelected(null);
} catch {
setSelected(piece?.color === game.turn() ? square : null);
}
}

function reset() {
setGame(new Chess());
setSelected(null);
setMessage("White to move");
}

const panel: React.CSSProperties = {
background: "#192638",
border: "1px solid #30465c",
borderRadius: 16,
padding: 18,
marginTop: 18
};

return (
<main style={{
minHeight: "100vh", background: "#0b1420",
color: "#edf3f8", padding: "18px",
fontFamily: "Arial, sans-serif"
}}>
<header style={{ textAlign: "center", marginBottom: 14 }}>
<h1 style={{ color: "#e2bb70", marginBottom: 5 }}>
♛ CHESS ARENA
</h1>
<p style={{ color: "#9baec0" }}>
3D Chess • Tournaments • Competition
</p>
</header>

<section style={{  
    height: "min(65vh, 620px)",  
    minHeight: 360,  
    borderRadius: 18,  
    overflow: "hidden",  
    border: "1px solid #40566b"  
  }}>  
    <Canvas camera={{ position: [0, 10.5, 12.5], fov: 42 }}>  
      <Board game={game} selected={selected} play={play}/>  
    </Canvas>  
  </section>  

  <div style={{ textAlign: "center", padding: 14 }}>  
    <strong>{message}</strong>  
    <p style={{ color: "#9baec0", fontSize: 13 }}>  
      Tap a piece, then tap its destination. Drag to rotate the board.  
    </p>  
    <button onClick={reset} style={{  
      background: "#d5aa62", color: "#111",  
      border: 0, borderRadius: 9,  
      padding: "12px 24px", fontWeight: "bold"  
    }}>  
      New Game  
    </button>  
  </div>  

  <section style={panel}>  
    <h2>♟ Player Accounts</h2>  
    <p>Registration and login — coming soon</p>  
  </section>  

  <section style={panel}>  
    <h2>🏆 Tournaments</h2>  
    <label>Entry fee (€)</label>  
    <input  
      type="number" min="0" max="10000"  
      value={fee}  
      onChange={e => setFee(e.target.value)}  
      style={{  
        display: "block", marginTop: 10,  
        padding: 12, borderRadius: 8,  
        width: "100%", maxWidth: 260,  
        background: "#181410", color: "white",  
        border: "1px solid #50677c"  
      }}  
    />  
    <p style={{ color: "#9baec0" }}>  
      Configurable entry fee: €0–€10,000  
    </p>  
  </section>  

  <section style={panel}>  
    <h2>🥇 Prizes</h2>  
    <p style={{ color: "#9baec0" }}>  
      Prize structure to be announced.  
    </p>  
  </section>  
</main>

);
}

