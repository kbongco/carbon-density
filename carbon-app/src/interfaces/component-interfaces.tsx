export default interface ChartData {
  labels: string[]
  datasets: {
    data: string[];
    backgroundColor: string[];
  }
}

export interface PaginationComponent {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange?: any;
}

export interface TableComponent {
  allRegions: any;
  currentPage?: number;
  itemsPerPage?: number;
  onViewData?: any;
}