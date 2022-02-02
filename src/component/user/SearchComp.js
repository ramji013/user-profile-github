import React, { Fragment } from "react";
import Search from "./Search";
import User from "./Users";

const SearchComp = ({ users, loading, searchUsers, clearUsers, setAlert }) => {
  return (
    <div>
      <Fragment>
        <Search
          searchUsers={searchUsers}
          clearUsers={clearUsers}
          showClear={users && users.length > 0 ? true : false}
          setAlert={setAlert}
        />
        <User users={users} loading={loading} />
      </Fragment>
    </div>
  );
};

export default SearchComp;
