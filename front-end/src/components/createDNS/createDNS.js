import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateDNS = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dnsData = new FormData();
      dnsData.append("name", name);
      dnsData.append("title", title);
      dnsData.append("description", description);
      dnsData.append("photo", photo);
      const { data } = await axios.post("/api/v1/dns/create-dns", dnsData);
      if (data?.success) {
        toast.success(data?.message);
        navigate("/all-dns");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ marginTop: "8rem" }}>
      <form
        onSubmit={handleSubmit}
        className="w-50 m-auto forms"
        style={{ padding: "3rem" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputDnsRecord" className="form-label">
            Enter DNS Recorde
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputtitle" className="form-label">
            Enter DNS Recorde title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputdescription" className="form-label">
            Enter DNS Recorde description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDNS;
