"use client";

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
const main = white ? "#e9e4d6" : "#26384a";
const metal = white ? "#b9a77c" : "#718da4";
const height = type === "p" ? 0.56 : type === "k" ? 1.12 : 0.85;
return (
<group position={[x, 0.12, z]} onClick={(e) => {
e.stopPropagation(); onClick();
}}>
<mesh position={[0, 0.10, 0]}>
<cylinderGeometry args={[0.34, 0.39, 0.2, 32]} />
<meshStandardMaterial color={metal} metalness={0.65} roughness={0.25}/>
</mesh>
<mesh position={[0, height / 2 + 0.13, 0]}>
<cylinderGeometry args={[0.19, 0.30, height, 32]}/>
<meshStandardMaterial color={main} metalness={0.35} roughness={0.3}/>
</mesh>
<mesh position={[0, height + 0.15, 0]}>
<sphereGeometry args={[type === "p" ? 0.19 : 0.25, 24, 16]}/>
<meshStandardMaterial color={metal} metalness={0.6} roughness={0.2}/>
</mesh>
<Text
position={[0, height + 0.15, 0.255]}
fontSize={0.27}
color={white ? "#182637" : "#ffffff"}
anchorX="center"
anchorY="middle"
>
{names[type]}
</Text>
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
color={selected === square ? "#e3b85c" : light ? "#ead4a5" : "#08090c"}
roughness={0.08} metalness={0.28}
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
<color attach="background" args={["#101a27"]}/>
<ambientLight intensity={1.5}/>
<directionalLight position={[4, 10, 5]} intensity={2.6}/>
<pointLight position={[-5, 5, -3]} intensity={45} color="#7ec9ff"/>
<mesh position={[0, -0.075, 0]}>
  <boxGeometry args={[8.22, 0.035, 8.22]} />
  <meshStandardMaterial color="#d4a64b" metalness={0.85} roughness={0.12} />
</mesh>
<RoundedBox args={[8.5, 0.4, 8.5]} radius={0.12} position={[0, -0.28, 0]}>
<meshStandardMaterial color="#08090c" metalness={0.65} roughness={0.08}/>
</RoundedBox>
{squares}
<OrbitControls  
enablePan={false}  
minDistance={9}  
maxDistance={17}  
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
    <Canvas camera={{ position: [0, 10, 10], fov: 48 }}>  
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
        background: "#101a27", color: "white",  
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

