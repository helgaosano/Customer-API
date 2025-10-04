import React, { useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    address: ""
  });
  const [editCustomer, setEditCustomer] = useState(null);

  const fetchCustomers = async () => {
  try {
    const res = await fetch("/api/customers/all");
    
    console.log("Raw response object:", res); // <-- log the response object

    if (!res.ok) {
      const text = await res.text();
      console.error("Server returned error:", text); // <-- log raw server output
      return;
    }

    const data = await res.json();
    console.log("Parsed JSON data:", data); // <-- log parsed JSON
    setCustomers(data);
  } catch (err) {
    console.error("Fetch failed with error:", err); // <-- log network/other errors
  }
};



  // ✅ Create customer
  const createCustomer = async () => {
    await fetch("/api/customers/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });
    setNewCustomer({
      id: "",
      firstName: "",
      lastName: "",
      nationalId: "",
      phoneNumber: "",
      email: "",
      address: ""
    });
    fetchCustomers();
  };

  // ✅ Update customer
  const updateCustomer = async (id) => {
    await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCustomer),
    });
    setEditCustomer(null);
    fetchCustomers();
  };

  // ✅ Delete customer
  const deleteCustomer = async (id) => {
    await fetch(`/api/customers/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  };

//   return (
//     <div style={{ padding: "30px" , backgroundColor: "cyan", position: "relative", borderTop: "100px"}}>
//       <h1>Customer CRUD</h1>

//       {/* ✅ Fetch Button */}
//       <button onClick={fetchCustomers}>Fetch Customers</button>

//       {/* ✅ Customer List (only shown after fetching) */}
//       {customers.length > 0 && (
//         <>S
//           <h2>Customer List</h2>
//           <ul>
//             {customers.map((c) => (
//               <li key={c.id}>
//                 {editCustomer?.id === c.id ? (
//                   <>
//                     <input
//                       value={editCustomer.firstName}
//                       onChange={(e) =>
//                         setEditCustomer({ ...editCustomer, firstName: e.target.value })
//                       }
//                     />
//                     <input
//                       value={editCustomer.email}
//                       onChange={(e) =>
//                         setEditCustomer({ ...editCustomer, email: e.target.value })
//                       }
//                     />
//                     <button onClick={() => updateCustomer(c.id)}>Save</button>
//                     <button onClick={() => setEditCustomer(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     {c.firstName} {c.lastName} ({c.email})
//                     <button onClick={() => setEditCustomer(c)}>Edit</button>
//                     <button onClick={() => deleteCustomer(c.id)}>Delete</button>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* ✅ Create Customer Form */}
//       <h2>Create Customer</h2>
//       <input
//         placeholder="First Name"
//         value={newCustomer.firstName}
//         onChange={(e) =>
//           setNewCustomer({ ...newCustomer, firstName: e.target.value })
//         }
//       />
//       <input
//         placeholder="Last Name"
//         value={newCustomer.lastName}
//         onChange={(e) =>
//           setNewCustomer({ ...newCustomer, lastName: e.target.value })
//         }
//       />
//       <input
//         placeholder="National ID"
//         value={newCustomer.nationalId}
//         onChange={(e) =>
//           setNewCustomer({ ...newCustomer, nationalId: e.target.value })
//         }
//       />
//       <input
//         placeholder="Phone Number"
//         value={newCustomer.phoneNumber}
//         onChange={(e) =>
//           setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })
//         }
//       />
//       <input
//         placeholder="Email"
//         value={newCustomer.email}
//         onChange={(e) =>
//           setNewCustomer({ ...newCustomer, email: e.target.value })
//         }
//       />
//       <input
//         placeholder="Address"
//         value={newCustomer.address}
//         onChange={(e) =>
//           setNewCustomer({ ...newCustomer, address: e.target.value })
//         }
//       />
//       <button onClick={createCustomer}>Add Customer</button>
//     </div>
//   );
// }
return (
  <div
    style={{
      maxWidth: "800px",
      margin: "50px auto", // centers the container
      padding: "30px",
      backgroundColor: "#e0f7fa",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Customer CRUD</h1>

    {/* Fetch Customers Button */}
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <button
        onClick={fetchCustomers}
        style={{
          padding: "10px 20px",
          backgroundColor: "#00796b",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Fetch Customers
      </button>
    </div>

    {/* Customer List */}
    {customers.length > 0 && (
      <div
        style={{
          backgroundColor: "#95ccc5ff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Customer List</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px" }}>First Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Last Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
              <th style={{ textAlign: "center", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #ccc" }}>
                {editCustomer?.id === c.id ? (
                  <>
                    <td style={{ padding: "8px" }}>
                      <input
                        value={editCustomer.firstName}
                        onChange={(e) =>
                          setEditCustomer({ ...editCustomer, firstName: e.target.value })
                        }
                        style={{ width: "90%" }}
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        value={editCustomer.lastName}
                        onChange={(e) =>
                          setEditCustomer({ ...editCustomer, lastName: e.target.value })
                        }
                        style={{ width: "90%" }}
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        value={editCustomer.email}
                        onChange={(e) =>
                          setEditCustomer({ ...editCustomer, email: e.target.value })
                        }
                        style={{ width: "90%" }}
                      />
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      <button
                        onClick={() => updateCustomer(c.id)}
                        style={{
                          padding: "5px 10px",
                          marginRight: "5px",
                          backgroundColor: "#388e3c",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditCustomer(null)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#d32f2f",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: "8px" }}>{c.firstName}</td>
                    <td style={{ padding: "8px" }}>{c.lastName}</td>
                    <td style={{ padding: "8px" }}>{c.email}</td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      <button
                        onClick={() => setEditCustomer(c)}
                        style={{
                          padding: "5px 10px",
                          marginRight: "5px",
                          backgroundColor: "#043c5cff",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCustomer(c.id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#d32f2f",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* Create Customer Form */}
    <div
      style={{
        backgroundColor: "#b5f5f8ff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Create Customer</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="ID"
          value={newCustomer.id}
          onChange={(e) => setNewCustomer({ ...newCustomer, id: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
        <input
          placeholder="First Name"
          value={newCustomer.firstName}
          onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
        <input
          placeholder="Last Name"
          value={newCustomer.lastName}
          onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
        <input
          placeholder="National ID"
          value={newCustomer.nationalId}
          onChange={(e) => setNewCustomer({ ...newCustomer, nationalId: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
        <input
          placeholder="Phone Number"
          value={newCustomer.phoneNumber}
          onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
        <input
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
        <input
          placeholder="Address"
          value={newCustomer.address}
          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
          style={{ flex: "1 1 45%", padding: "8px" }}
        />
      </div>
      <button
        onClick={createCustomer}
        style={{
          padding: "10px 20px",
          backgroundColor: "#00796b",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Customer
      </button>
    </div>
  </div>
);
}

export default App;
