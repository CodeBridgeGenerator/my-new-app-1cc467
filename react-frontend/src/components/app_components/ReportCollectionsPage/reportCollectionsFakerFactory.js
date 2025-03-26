
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
testName: faker.lorem.sentence(""),
targetUrl: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
additionalNotes: faker.lorem.sentence(""),
dateStarted: faker.date.past(""),
dateCompleted: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
