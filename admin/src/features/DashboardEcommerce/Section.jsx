const Section = ({ userCategory }) => {
  return (
    <div className="dashboard-header">
      <h2>Dashboard</h2>
      <span className="user-role">Role: {userCategory || "Admin"}</span>
    </div>
  );
};

export default Section;
