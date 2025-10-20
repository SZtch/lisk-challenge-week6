"use client";

import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Address as ViemAddress } from "viem";

type AddressQRCodeModalProps = {
  address: ViemAddress | string;
  modalId: string;
};

export const AddressQRCodeModal = ({ address, modalId }: AddressQRCodeModalProps) => {
  // Pastikan value-nya string valid
  const qrValue = useMemo(() => (address ? String(address) : ""), [address]);

  if (!address) return null;

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box relative bg-base-200 border border-base-300">
          {/* Tombol close */}
          <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-3 top-3">
            ✕
          </label>

          {/* Konten QR Code */}
          <div className="flex flex-col items-center justify-center gap-5 py-6">
            <QRCodeSVG value={qrValue} size={220} />
            <p className="text-sm text-center text-base-content/80 break-all">{address}</p>
          </div>
        </label>
      </label>
    </>
  );
};
