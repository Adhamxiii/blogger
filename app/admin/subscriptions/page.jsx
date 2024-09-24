"use client";

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubscriptionsPage = () => {
  const [emails, setEmails] = useState([]);

const fetchSubs = async () => {
      const res = await axios.get("/api/email");
      setEmails(res.data.data);
    };

    const deleteEmail = async (id) => {
    const res = await axios.delete("/api/email", {
      params: {
        id: id,
      },
    });
    toast.success(res.data.msg);
    fetchSubs();
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  
  return (
    <div className="flex-1 px-5 pt-5 sm:pl-16 sm:pt-12">
      <h1>Subscriptions</h1>
      <div className="scrollbar-hide relative mt-4 h-[80vh] max-w-[600px] overflow-x-auto border border-gray-400">
        <table className="w-full text-sm text-gray-500">
          <thead className="bg-gray-50 text-left text-sm uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden px-6 py-3 sm:block">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <SubsTableItem key={email._id} {...email} deleteEmail={deleteEmail} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
