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
  type: string;
  color: string;
  x: number;
  z: number;
  onClick: () => void;
}) {
  const white = color === "w";
  const main = white ? "#fff0d7" : "#101015";
  const gold = "#d9a64b";

  const material = (
    <meshPhysicalMaterial
      color={main}
      metalness={0.16}
      roughness={0.09}
      clearcoat={1}
      clearcoatRoughness={0.04}
    />
  );

  const accent = (
    <meshStandardMaterial
      color={gold}
      metalness={0.85}
      roughness={0.16}
    />
  );

  const ball = (y: number, r: number) => (
    <mesh position={[0, y, 0]}>
      <sphereGeometry args={[r, 24, 16]} />
      {material}
    </mesh>
  );

  return (
    <group
      position={[x, 0.12, z]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <mesh position={[0, 0.035, 0]}>
        <cylinderGeometry args={[0.34, 0.37, 0.07, 40]} />
        {material}
      </mesh>

      <mesh position={[0, 0.10, 0]}>
        <torusGeometry args={[0.27, 0.045, 12, 40]} />
        {accent}
      </mesh>

      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry
          args={[0.15, 0.28, 0.45, 40]}
        />
        {material}
      </mesh>

      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry
          args={[0.21, 0.17, 0.08, 40]}
        />
        {material}
      </mesh>

      {type === "p" && ball(0.72, 0.17)}

      {type === "r" && (
        <group>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.25, 0.21, 0.28, 40]} />
            {material}
          </mesh>
          {[0,1,2,3,4,5,6,7].map(i => (
            <mesh
              key={i}
              position={[
                Math.cos(i*Math.PI/4)*0.20,
                0.94,
                Math.sin(i*Math.PI/4)*0.20
              ]}
            >
              <boxGeometry args={[0.13, 0.17, 0.13]} />
              {material}
            </mesh>
          ))}
        </group>
      )}

      {type === "b" && (
        <group>
          <mesh position={[0, 0.77, 0]}>
            <sphereGeometry args={[0.19, 32, 24]} />
            {material}
          </mesh>
          <mesh position={[0, 0.94, 0]}>
            <coneGeometry args={[0.12, 0.24, 32]} />
            {material}
          </mesh>
          {ball(1.07, 0.055)}
        </group>
      )}

      {type === "n" && (
        <group>
          <mesh
            position={[0, 0.78, 0]}
            rotation={[0, 0, -0.22]}
          >
            <capsuleGeometry args={[0.19, 0.40, 8, 20]} />
            {material}
          </mesh>
          <mesh position={[0.12, 0.96, 0.10]}>
            <boxGeometry args={[0.33, 0.20, 0.24]} />
            {material}
          </mesh>
          <mesh position={[0.24, 0.91, 0.10]}>
            <sphereGeometry args={[0.12, 20, 16]} />
            {material}
          </mesh>
          {[-0.10, 0.10].map((v,i) => (
            <mesh
              key={i}
              position={[-0.04, 1.14, v]}
              rotation={[0,0,-0.20]}
            >
              <coneGeometry args={[0.065, 0.20, 16]} />
              {material}
            </mesh>
          ))}
          {[0,1,2,3].map(i => (
            <mesh
              key={i}
              position={[-0.18, 0.73+i*0.10, 0]}
            >
              <sphereGeometry args={[0.07, 12, 10]} />
              {accent}
            </mesh>
          ))}
          <mesh position={[0.19, 1.00, 0.225]}>
            <sphereGeometry args={[0.025, 12, 10]} />
            {accent}
          </mesh>
        </group>
      )}

      {(type === "q" || type === "k") && (
        <group>
          <mesh position={[0, 0.77, 0]}>
            <cylinderGeometry args={[0.21, 0.13, 0.35, 40]} />
            {material}
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <torusGeometry args={[0.20, 0.055, 12, 40]} />
            {accent}
          </mesh>

          {type === "q" && (
            <group>
              {[0,1,2,3,4,5,6,7].map(i => (
                <mesh
                  key={i}
                  position={[
                    Math.cos(i*Math.PI/4)*0.21,
                    1.08,
                    Math.sin(i*Math.PI/4)*0.21
                  ]}
                >
                  <sphereGeometry args={[0.075, 16, 12]} />
                  {accent}
                </mesh>
              ))}
              {ball(1.10, 0.10)}
            </group>
          )}

          {type === "k" && (
            <group>
              <mesh position={[0, 1.12, 0]}>
                <boxGeometry args={[0.09, 0.35, 0.09]} />
                {accent}
              </mesh>
              <mesh position={[0, 1.17, 0]}>
                <boxGeometry args={[0.28, 0.09, 0.09]} />
                {accent}
              </mesh>
            </group>
          )}
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
color={selected === square ? "#e5b85a" : light ? "#e5d5b4" : "#302c2b"}
roughness={0.13} metalness={0.38}
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

