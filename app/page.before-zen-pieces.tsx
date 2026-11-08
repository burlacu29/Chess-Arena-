"use client";
import { royalZen } from "./styles/royalZen";

import { useState } from "react";
import { Chess } from "chess.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox } from "@react-three/drei";

type Square = import("chess.js").Square;

const names: Record<string, string> = {
p: "P", r: "R", n: "N", b: "B", q: "Q", k: "K"
};



function Piece({ type, color, x, z, onClick }: {
  type: string; color: string; x: number; z: number;
  onClick: () => void;
}) {
  const white = color === "w";
  const main = white ? royalZen.pieces.white : royalZen.pieces.black;
  const trim = white ? "#c89b48" : "#5e5550";

  const mat = <meshPhysicalMaterial
    color={main} metalness={0.4} roughness={0.12}
    clearcoat={0.85} clearcoatRoughness={0.12}
  />;
  const gold = <meshStandardMaterial
    color={trim} metalness={0.4} roughness={0.12}
  />;

  return (
    <group position={[x, 0.09, z]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <mesh position={[0, 0.065, 0]}>
        <cylinderGeometry args={[0.34, 0.39, 0.13, 32]} />
        {mat}
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[0.29, 0.035, 12, 32]} />
        {gold}
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.16, 0.29, 0.40, 32]} />
        {mat}
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.24, 0.19, 0.10, 32]} />
        {gold}
      </mesh>

      {type === "p" && (
        <mesh position={[0, 0.73, 0]}>
          <sphereGeometry args={[0.17, 24, 16]} />
          {mat}
        </mesh>
      )}

      {type === "r" && (
        <group>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.27, 0.24, 0.25, 8]} />
            {mat}
          </mesh>
          {[0,1,2,3,4,5,6,7].map(i => (
            <mesh key={i}
              position={[
                Math.cos(i*Math.PI/4)*0.23,
                0.91,
                Math.sin(i*Math.PI/4)*0.23
              ]}>
              <boxGeometry args={[0.12, 0.16, 0.12]} />
              {mat}
            </mesh>
          ))}
        </group>
      )}

      {type === "n" && (
        <group>
          <mesh position={[0, 0.78, 0]} rotation={[0,0,-0.25]}>
            <boxGeometry args={[0.24, 0.47, 0.30]} />
            {mat}
          </mesh>
          <mesh position={[0.10, 1.02, 0]}>
            <boxGeometry args={[0.38, 0.20, 0.27]} />
            {mat}
          </mesh>
          <mesh position={[0.18, 1.14, 0]}>
            <coneGeometry args={[0.11, 0.22, 4]} />
            {mat}
          </mesh>
          <mesh position={[0.19, 1.04, 0.14]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            {gold}
          </mesh>
        </group>
      )}

      {type === "b" && (
        <group>
          <mesh position={[0, 0.80, 0]}>
            <sphereGeometry args={[0.21, 24, 16]} />
            {mat}
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <coneGeometry args={[0.17, 0.35, 32]} />
            {mat}
          </mesh>
          <mesh position={[0, 1.22, 0]}>
            <sphereGeometry args={[0.065, 16, 12]} />
            {gold}
          </mesh>
        </group>
      )}

      {type === "q" && (
        <group>
          <mesh position={[0, 0.79, 0]}>
            <cylinderGeometry args={[0.28, 0.17, 0.32, 32]} />
            {mat}
          </mesh>
          {[0,1,2,3,4,5,6,7].map(i => (
            <mesh key={i} position={[
              Math.cos(i*Math.PI/4)*0.23,
              1.02,
              Math.sin(i*Math.PI/4)*0.23
            ]}>
              <sphereGeometry args={[0.075, 12, 10]} />
              {gold}
            </mesh>
          ))}
          <mesh position={[0, 1.08, 0]}>
            <sphereGeometry args={[0.12, 16, 12]} />
            {mat}
          </mesh>
        </group>
      )}

      {type === "k" && (
        <group>
          <mesh position={[0, 0.82, 0]}>
            <cylinderGeometry args={[0.23, 0.17, 0.39, 32]} />
            {mat}
          </mesh>
          <mesh position={[0, 1.10, 0]}>
            <boxGeometry args={[0.12, 0.35, 0.12]} />
            {gold}
          </mesh>
          <mesh position={[0, 1.17, 0]}>
            <boxGeometry args={[0.30, 0.10, 0.12]} />
            {gold}
          </mesh>
        </group>
      )}
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
<meshStandardMaterial
color={selected === square ? royalZen.board.selected : light ? royalZen.board.light : royalZen.board.dark}
roughness={0.12} metalness={0.4}
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
<ambientLight intensity={1.5}/>
<directionalLight position={[4, 10, 5]} intensity={2.6}/>
<pointLight position={[-5, 5, -3]} intensity={45} color="#7ec9ff"/>
<mesh position={[0, -0.075, 0]}>
  <boxGeometry args={[8.22, 0.035, 8.22]} />
  <meshStandardMaterial color="#c89545" metalness={0.4} roughness={0.12} />
</mesh>
<RoundedBox args={[8.5, 0.4, 8.5]} radius={0.12} position={[0, -0.28, 0]}>
<meshStandardMaterial color="#27170f" metalness={0.4} roughness={0.12}/>
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
    <Canvas camera={{ position: [0, 8.5, 9.5], fov: 42 }}>  
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

