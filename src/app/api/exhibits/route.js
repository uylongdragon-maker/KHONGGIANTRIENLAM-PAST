import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { exhibitsData, postersData } from "../../../data/exhibits";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let exhibits = await prisma.exhibit.findMany({
      orderBy: { id: "asc" }
    });
    
    let posters = await prisma.poster.findMany({
      orderBy: { id: "asc" }
    });

    // Auto-seed or re-sync if exhibits count does not match the 36 forensic exhibits
    if (exhibits.length < 36) {
      console.log("Seeding / updating 36 exhibits to database...");
      for (const e of exhibitsData) {
        await prisma.exhibit.upsert({
          where: { id: e.id },
          update: {
            name: e.name,
            subtitle: e.subtitle,
            category: e.category,
            description: e.description,
            effects: e.effects,
            warning: e.warning || null,
            positionX: e.position.x,
            positionY: e.position.y,
            positionZ: e.position.z,
            cabinetId: e.cabinetId,
            audioText: e.audioText,
            waveform: e.waveform,
            inspectInfo: e.inspectInfo || null,
            scale: e.scale !== undefined ? e.scale : 1.0,
            modelUrl: e.modelUrl || null
          },
          create: {
            id: e.id,
            name: e.name,
            subtitle: e.subtitle,
            category: e.category,
            description: e.description,
            effects: e.effects,
            warning: e.warning || null,
            positionX: e.position.x,
            positionY: e.position.y,
            positionZ: e.position.z,
            cabinetId: e.cabinetId,
            audioText: e.audioText,
            waveform: e.waveform,
            inspectInfo: e.inspectInfo || null,
            scale: e.scale !== undefined ? e.scale : 1.0,
            modelUrl: e.modelUrl || null
          }
        });
      }
      exhibits = await prisma.exhibit.findMany({ orderBy: { id: "asc" } });
    }

    if (posters.length === 0) {
      console.log("Seeding posters to database...");
      await prisma.poster.createMany({
        data: postersData.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          positionX: p.position.x,
          positionY: p.position.y,
          positionZ: p.position.z,
          rotationX: p.rotation.x,
          rotationY: p.rotation.y,
          rotationZ: p.rotation.z,
          impactText: p.impactText
        }))
      });
      posters = await prisma.poster.findMany({ orderBy: { id: "asc" } });
    }

    // Map database models to matches front-end 3D scene structure
    const formattedExhibits = exhibits.map(e => ({
      id: e.id,
      name: e.name,
      subtitle: e.subtitle,
      category: e.category,
      description: e.description,
      effects: e.effects,
      warning: e.warning,
      position: { x: e.positionX, y: e.positionY, z: e.positionZ },
      cabinetId: e.cabinetId,
      audioText: e.audioText,
      waveform: e.waveform,
      inspectInfo: e.inspectInfo,
      scale: e.scale,
      modelUrl: e.modelUrl
    }));

    const formattedPosters = posters.map(p => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      position: { x: p.positionX, y: p.positionY, z: p.positionZ },
      rotation: { x: p.rotationX, y: p.rotationY, z: p.rotationZ },
      impactText: p.impactText
    }));

    return NextResponse.json({ 
      exhibits: formattedExhibits, 
      posters: formattedPosters
    });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch exhibits from database" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, type, data } = body;

    if (action === "save_all") {
      const { exhibits: newExhibits, posters: newPosters } = data;

      if (newExhibits) {
        for (const e of newExhibits) {
          await prisma.exhibit.upsert({
            where: { id: e.id },
            update: {
              name: e.name,
              subtitle: e.subtitle,
              category: e.category,
              description: e.description,
              effects: e.effects,
              warning: e.warning || null,
              positionX: e.position.x,
              positionY: e.position.y,
              positionZ: e.position.z,
              cabinetId: e.cabinetId,
              audioText: e.audioText,
              waveform: e.waveform,
              inspectInfo: e.inspectInfo || null,
              scale: e.scale !== undefined ? e.scale : 1.0,
              modelUrl: e.modelUrl || null
            },
            create: {
              id: e.id,
              name: e.name,
              subtitle: e.subtitle,
              category: e.category,
              description: e.description,
              effects: e.effects,
              warning: e.warning || null,
              positionX: e.position.x,
              positionY: e.position.y,
              positionZ: e.position.z,
              cabinetId: e.cabinetId,
              audioText: e.audioText,
              waveform: e.waveform,
              inspectInfo: e.inspectInfo || null,
              scale: e.scale !== undefined ? e.scale : 1.0,
              modelUrl: e.modelUrl || null
            }
          });
        }
      }

      if (newPosters) {
        for (const p of newPosters) {
          await prisma.poster.upsert({
            where: { id: p.id },
            update: {
              title: p.title,
              subtitle: p.subtitle,
              description: p.description,
              positionX: p.position.x,
              positionY: p.position.y,
              positionZ: p.position.z,
              rotationX: p.rotation.x,
              rotationY: p.rotation.y,
              rotationZ: p.rotation.z,
              impactText: p.impactText
            },
            create: {
              id: p.id,
              title: p.title,
              subtitle: p.subtitle,
              description: p.description,
              positionX: p.position.x,
              positionY: p.position.y,
              positionZ: p.position.z,
              rotationX: p.rotation.x,
              rotationY: p.rotation.y,
              rotationZ: p.rotation.z,
              impactText: p.impactText
            }
          });
        }
      }

      return NextResponse.json({ success: true, message: "Successfully saved to database!" });
    }

    if (action === "delete") {
      const { id } = data;
      if (type === "exhibit") {
        await prisma.exhibit.delete({ where: { id } });
      } else if (type === "poster") {
        await prisma.poster.delete({ where: { id } });
      }
      return NextResponse.json({ success: true, message: `Deleted ${type} from database` });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json({ error: "Failed to save data to database" }, { status: 500 });
  }
}
