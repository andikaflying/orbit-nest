export interface ProteinData {
  _id: string;
  PDBID: string;
  UniProtKBID: string;
  druggabilityFactor: string[];
  druggabilityScore: string;
  function: string;
  modulator: Modulator[];
  proteinName: string;
  data_size: number;
  distribution: Distribution;
}

export interface Modulator {
  compound: string;
  type: string;
  potency: string;
  clinicalStage: string;
}

export interface Distribution {
  mw: Mw;
  logp: Logp;
  tpsa: Tpsa;
  complexity: Complexity;
  num_aromatic_rings: NumAromaticRings;
  max_ring_size: MaxRingSize;
  h_donors: HDonors;
  h_acceptors: HAcceptors;
  rot_bonds: RotBonds;
  heavy_atom_count: HeavyAtomCount;
  Solvation_Energy: SolvationEnergy;
}

export interface Mw {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface Logp {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface Tpsa {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface Complexity {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface NumAromaticRings {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface MaxRingSize {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface HDonors {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface HAcceptors {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface RotBonds {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface HeavyAtomCount {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}

export interface SolvationEnergy {
  key: string;
  min_val: number;
  max_val: number;
  hist: number[];
  bin_edges: number[];
}
