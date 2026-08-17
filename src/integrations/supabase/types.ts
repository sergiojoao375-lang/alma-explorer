export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admin_config: {
        Row: {
          id: number
          pin_hash: string
          updated_at: string
        }
        Insert: {
          id: number
          pin_hash: string
          updated_at?: string
        }
        Update: {
          id?: number
          pin_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      alunos_estatisticas: {
        Row: {
          classe: string | null
          created_at: string
          device_id: string
          id: string
          licoes_concluidas: number
          moedas: number
          nome: string
          updated_at: string
          xp: number
        }
        Insert: {
          classe?: string | null
          created_at?: string
          device_id: string
          id?: string
          licoes_concluidas?: number
          moedas?: number
          nome: string
          updated_at?: string
          xp?: number
        }
        Update: {
          classe?: string | null
          created_at?: string
          device_id?: string
          id?: string
          licoes_concluidas?: number
          moedas?: number
          nome?: string
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      conta_central_almara: {
        Row: {
          id: number
          retencao_lucro_software_10: number
          saldo_disponivel_distribuicao: number
          saldo_total_arrecadado: number
        }
        Insert: {
          id: number
          retencao_lucro_software_10?: number
          saldo_disponivel_distribuicao?: number
          saldo_total_arrecadado?: number
        }
        Update: {
          id?: number
          retencao_lucro_software_10?: number
          saldo_disponivel_distribuicao?: number
          saldo_total_arrecadado?: number
        }
        Relationships: []
      }
      patrocinadores: {
        Row: {
          ativo: boolean
          created_at: string
          disciplina_alvo: string
          explicacao: string | null
          id: string
          nome_marca: string
          opcoes: string[] | null
          pergunta: string | null
          resposta_index: number
          updated_at: string
          valor_patrocinio: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          disciplina_alvo: string
          explicacao?: string | null
          id?: string
          nome_marca: string
          opcoes?: string[] | null
          pergunta?: string | null
          resposta_index?: number
          updated_at?: string
          valor_patrocinio?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          disciplina_alvo?: string
          explicacao?: string | null
          id?: string
          nome_marca?: string
          opcoes?: string[] | null
          pergunta?: string | null
          resposta_index?: number
          updated_at?: string
          valor_patrocinio?: number
        }
        Relationships: []
      }
      stock_premios: {
        Row: {
          custo_moedas_almara: number
          id: string
          quantidade_disponivel: number
          supermercado_id: string
          tipo_item: string
          valor_comercial_kz: number
        }
        Insert: {
          custo_moedas_almara?: number
          id?: string
          quantidade_disponivel?: number
          supermercado_id: string
          tipo_item: string
          valor_comercial_kz?: number
        }
        Update: {
          custo_moedas_almara?: number
          id?: string
          quantidade_disponivel?: number
          supermercado_id?: string
          tipo_item?: string
          valor_comercial_kz?: number
        }
        Relationships: [
          {
            foreignKeyName: "stock_premios_supermercado_id_fkey"
            columns: ["supermercado_id"]
            isOneToOne: false
            referencedRelation: "supermercados"
            referencedColumns: ["id"]
          },
        ]
      }
      supermercados: {
        Row: {
          ativo: boolean
          created_at: string
          credito_troco_acumulado: number
          filial_local: string
          id: string
          nome_rede: string
          utilizador_gerente: string | null
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          credito_troco_acumulado?: number
          filial_local: string
          id?: string
          nome_rede: string
          utilizador_gerente?: string | null
        }
        Update: {
          ativo?: boolean
          created_at?: string
          credito_troco_acumulado?: number
          filial_local?: string
          id?: string
          nome_rede?: string
          utilizador_gerente?: string | null
        }
        Relationships: []
      }
      transacoes_financeiras: {
        Row: {
          data_registo: string
          id: string
          origem_doador: string
          supermercado_id: string | null
          tipo_doacao: string
          valor_kwanza: number
        }
        Insert: {
          data_registo?: string
          id?: string
          origem_doador: string
          supermercado_id?: string | null
          tipo_doacao: string
          valor_kwanza: number
        }
        Update: {
          data_registo?: string
          id?: string
          origem_doador?: string
          supermercado_id?: string | null
          tipo_doacao?: string
          valor_kwanza?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_financeiras_supermercado_id_fkey"
            columns: ["supermercado_id"]
            isOneToOne: false
            referencedRelation: "supermercados"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
