import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../../lib/api";

export default function QrScan() {
  const regionId = "dd3-qr-region";
  const qrRef = useRef(null);
  const [status, setStatus] = useState("Point your camera to the mess QR.");
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    const qr = new Html5Qrcode(regionId);
    qrRef.current = qr;

    async function start() {
      setErr("");
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras?.length) throw new Error("No camera found");
        await qr.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 240 },
          async (decodedText) => {
            if (!active) return;
            setStatus("QR detected. Marking attendance...");
            try {
              await api.post("/api/student/attendance/scan", { qrToken: decodedText });
              setStatus("Attendance marked successfully.");
            } catch (e) {
              setErr(e?.response?.data?.message || e.message || "Failed to mark attendance");
              setStatus("Try scanning again.");
            }
          }
        );
      } catch (e) {
        setErr(e.message || "Camera error");
      }
    }

    start();

    return () => {
      active = false;
      qr
        .stop()
        .then(() => qr.clear())
        .catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dd3-grid2">
      <div className="dd3-card">
        <div className="dd3-cardTitle">QR Attendance</div>
        <div className="dd3-muted">{status}</div>
        {err ? <div className="dd3-alert">{err}</div> : null}
        <div id={regionId} className="dd3-qrRegion" />
      </div>

      <div className="dd3-card">
        <div className="dd3-cardTitle">How it works</div>
        <div className="dd3-cardText">
          Admin generates a meal QR (Breakfast/Lunch/Dinner). You scan it once in the mess to mark
          your attendance.
        </div>
        <div className="dd3-muted">
          Tip: If camera permission is blocked, allow it in the browser settings and reload.
        </div>
      </div>
    </div>
  );
}

