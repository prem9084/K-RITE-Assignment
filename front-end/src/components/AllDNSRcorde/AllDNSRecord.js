import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const AllDNSRecord = () => {
  const [dnsRecord, setDnsRecord] = useState([]);

  const AllDNSRecord = async () => {
    try {
      const res = await axios.get("/api/v1/dns/get-dns");
      setDnsRecord(res.data.record);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllDNSRecord();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/dns/delete-dns/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "10rem" }}
    >
      {dnsRecord?.map((u) => (
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={`/api/v1/dns/get-photo-dns/${u._id}`}
            className="card-img-top"
            alt={u.name}
          />
          <div className="card-body">
            <p className="card-text">UserID:{u._id}</p>
            <p className="card-text">Name: {u.name}</p>
            <p className="card-text">Title: {u.title}</p>
            <p className="card-text">Description: {u.description}</p>
          </div>
          <div className="d-flex">
            <Link to={`/update-dns/${u._id}`} className="btn btn-primary w-50">
              UPDATE
            </Link>

            <button
              onClick={() => handleDelete(u._id)}
              className="btn btn-danger w-50 ms-2"
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDNSRecord;
