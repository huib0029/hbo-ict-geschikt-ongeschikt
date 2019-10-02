<v-card class="elevation-12">
    <v-toolbar
            color="primary"
            dark
            flat
    >
        <v-toolbar-title>Vraag 1</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
        <v-form>
            <v-text-field
                    label="Wat is je pincode?"
                    name="login"
                    type="text"
            ></v-text-field>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary">Door naar vraag {{ nextQuestion }}</v-btn>
    </v-card-actions>
</v-card>