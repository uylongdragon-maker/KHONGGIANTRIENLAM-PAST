import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { exhibitsData, postersData } from "../../../data/exhibits";

export async function GET() {
  try {
    let exhibits = await prisma.exhibit.findMany({
      orderBy: { id: "asc" }
    });
    
    let posters = await prisma.poster.findMany({
      orderBy: { id: "asc" }
    });

    let tiktokVideos = await prisma.tiktokVideo.findMany({
      orderBy: { id: "asc" }
    });

    // Auto-seed if database is empty on first boot
    if (exhibits.length === 0) {
      console.log("Seeding exhibits to Supabase...");
      await prisma.exhibit.createMany({
        data: exhibitsData.map(e => ({
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
          scale: e.scale !== undefined ? e.scale : 1.0
        }))
      });
      exhibits = await prisma.exhibit.findMany({ orderBy: { id: "asc" } });
    }

    if (posters.length === 0) {
      console.log("Seeding posters to Supabase...");
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

    if (tiktokVideos.length === 0) {
      console.log("Seeding TikTok videos to Supabase...");
      const initialTiktokVideos = [
        {
          id: "tiktok1",
          title: "Hiệu ứng Ma Túy Đá tàn hoại thần kinh kinh hoàng - VTV24",
          url: "https://www.tiktok.com/@vtv24news/video/7183029104829287682"
        },
        {
          id: "tiktok2",
          title: "Sự thật về thuốc lá điện tử ngụy trang ma túy học đường - VTV24",
          url: "https://www.tiktok.com/@vtv24news/video/7219358291083928192"
        },
        {
          id: "tiktok3",
          title: "Hiểm họa ma túy ảo giác tẩm trong bùa lưỡi, nấm thức thần - PAST",
          url: "https://www.tiktok.com/@vtv24news/video/7258392019482910832"
        }
      ];
      await prisma.tiktokVideo.createMany({
        data: initialTiktokVideos
      });
      tiktokVideos = await prisma.tiktokVideo.findMany({ orderBy: { id: "asc" } });
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
      scale: e.scale
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
      posters: formattedPosters,
      tiktokVideos: tiktokVideos
    });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch exhibits from Supabase database" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, type, data } = body;

    if (action === "save_all") {
      const { exhibits: newExhibits, posters: newPosters, tiktokVideos: newTiktokVideos } = data;

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
              scale: e.scale !== undefined ? e.scale : 1.0
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
              scale: e.scale !== undefined ? e.scale : 1.0
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

      if (newTiktokVideos) {
        for (const t of newTiktokVideos) {
          await prisma.tiktokVideo.upsert({
            where: { id: t.id },
            update: {
              title: t.title,
              url: t.url
            },
            create: {
              id: t.id,
              title: t.title,
              url: t.url
            }
          });
        }
      }

      return NextResponse.json({ success: true, message: "Successfully saved to Supabase!" });
    }

    if (action === "delete") {
      const { id } = data;
      if (type === "exhibit") {
        await prisma.exhibit.delete({ where: { id } });
      } else if (type === "poster") {
        await prisma.poster.delete({ where: { id } });
      } else if (type === "tiktokVideo") {
        await prisma.tiktokVideo.delete({ where: { id } });
      }
      return NextResponse.json({ success: true, message: `Deleted ${type} from Supabase` });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json({ error: "Failed to save data to Supabase database" }, { status: 500 });
  }
}
