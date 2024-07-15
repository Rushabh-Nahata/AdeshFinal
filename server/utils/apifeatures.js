class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //BUILDING API SEARCH FEATURE

  search() {
    //Get the keyword from the api.You may find a keyword or not, Based on that we have used a turnery operation
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //Search with smallcase is enabled
          },

          //We could use name:this.queryStr.keyword  but it would only search that particular word
          //Example if our keyword is 'samosa' it would give result for 'samosa' only not 'samosamosa'
          //So we use regex, that searches that pattern in the name
        }
      : {}; //IF there are no keywords then do nothing

    //HERE WE SEND THE KEYWORD WITH THE KEYWORD THAT WE CREATED ON OUR OWN USING REGEX
    this.query.find({
      ...keyword,
    });

    //This will return the same class
    return this;
  }

  //WE ARE MAKING A FILTER FOR A CATEGORY
  filter() {
    //You cant do this. This might the original this.query too if queryCopy is changed, as it is passed by reference
    // const queryCopy = this.queryStr;

    //Instead of the above code do this. Now a copy is created of queryStr
    const queryCopy = { ...this.queryStr };

    //Remove some field for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter for price and rating

    let queryStr = JSON.stringify(queryCopy);

    //This will will price greater than ,less than etc

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    //Current page
    //Here QueryStr is set of all queries like keyword,category, page , limit etc
    const currentPage = Number(this.queryStr.page) || 1; //50-10

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
