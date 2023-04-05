import { Text, View } from "react-native";
import getCompany from "./companyList";

const CompanyItem = ({item}) => {
    return (
        <View>
            <Text>
                {item.name}
                {"             "}
                {item.domain}
                {"             "}
                {item.companyId}
            </Text>
        </View>
    )
}

export default CompanyItem;