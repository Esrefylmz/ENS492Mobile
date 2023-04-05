import { Text, ActivityIndicator, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import React from "react";

import CompanyItem from "./companyItem";


const CompanyList = () => {
  

  return (
    <>
      <Text>Companies!</Text>
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <>
          {companies.length > 0 ? (
            <FlatList
              data={companies}
              renderItem={(item) => CompanyItem(item)}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "lightgray",
                    marginVertical: 10,
                  }}
                />
              )}
            />
          ) : (
            <Text>No companies found</Text>
          )}
        </>
      )}
    </>
  );
}

export default CompanyList;
