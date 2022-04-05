// Returns a random DNA base except optionally provided one
const returnRandBase = (...providedBase) => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  if (providedBase.length > 0) {
    const reducedDnaBases = dnaBases.filter(dna => dna !== providedBase[0]);
    return reducedDnaBases[Math.floor(Math.random() * 3)];
  }
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Constructs P. Aequor organism object
const pAequorFactory = (specimenNum, dna) => {
  return {
    _specimenNum: specimenNum,
    _dna: dna,
    get specimenNum() {
      return this._specimenNum;
    },
    get dna() {
      return this._dna;
    },
    // mutates one base in DNA at random position
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      return this.dna[randomIndex] = returnRandBase(this.dna[randomIndex]);
    },
    // compares percentage of the same bases in identical positions between two samples
    compareDNA(sample) {
      let sumIdentical = 0;
      for (let i = 0; i < sample.dna.length; i++) {
        if (sample.dna[i] === this.dna[i]) {
          sumIdentical++
        }
      }
      const percentIdentical = (sumIdentical / sample.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${sample.specimenNum} have ${precentIdentical.toFixed(2)}% DNA in common`);

    },
    // if there are 60% or more 'C' or 'G' bases in DNA strand organism has more chances to survive
    willLikelySurvive() {
      let survivableBasesCounter = 0;
      this.dna.forEach(base => {if (base === 'C' || base === 'G') {survivableBasesCounter++}});
      return (survivableBasesCounter / this.dna.length) >= 0.6;
    }
  }
};

// Populate array with 30 samples of organism which are more likely to survive
const survavibleInstancesArray = [];
let sampleNum = 1;
while (survavibleInstancesArray.length < 30) {
  let testSpecimen = pAequorFactory(sampleNum, mockUpStrand());
  if (testSpecimen.willLikelySurvive()) {
    survavibleInstancesArray.push(testSpecimen);
  }
  sampleNum++;
}
console.log(survavibleInstancesArray);
