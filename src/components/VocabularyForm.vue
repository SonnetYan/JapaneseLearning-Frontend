<template>
  <div class="vocabulary-form">
    <h2>{{ isEditing ? 'Edit' : 'Add' }} Vocabulary</h2>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="kanji">Kanji (Optional)</label>
        <input 
          type="text" 
          id="kanji" 
          v-model="form.kanji" 
          placeholder="Enter kanji"
        />
      </div>
      
      <div class="form-group">
        <label for="kana">Kana (Required)</label>
        <input 
          type="text" 
          id="kana" 
          v-model="form.kana" 
          placeholder="Enter kana" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="meaning">Meaning (Required)</label>
        <input 
          type="text" 
          id="meaning" 
          v-model="form.meaning" 
          placeholder="Enter meaning" 
          required
        />
      </div>
      
      <h3>Example Sentences</h3>
      <div v-for="(example, index) in form.examples" :key="index" class="example-item">
        <div class="form-group">
          <label :for="'japanese-' + index">Japanese</label>
          <input 
            type="text" 
            :id="'japanese-' + index" 
            v-model="example.japanese" 
            placeholder="Enter example in Japanese" 
            required
          />
        </div>
        
        <div class="form-group">
          <label :for="'english-' + index">English</label>
          <input 
            type="text" 
            :id="'english-' + index" 
            v-model="example.english" 
            placeholder="Enter translation in English"
            required
          />
        </div>
        
        <button type="button" class="remove-btn" @click="removeExample(index)">
          Remove
        </button>
      </div>
      
      <button type="button" class="add-example-btn" @click="addExample">
        Add Example Sentence
      </button>
      
      <div class="form-group">
        <label for="tags">Tags (Comma separated)</label>
        <input 
          type="text" 
          id="tags" 
          v-model="tagsInput" 
          placeholder="Enter tags (e.g., noun, verb, JLPT N5)" 
        />
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-btn">
          {{ isEditing ? 'Update' : 'Add' }} Vocabulary
        </button>
        <button type="button" class="cancel-btn" @click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { vocabularyService } from '../services/api';

export default {
  name: 'VocabularyForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isEditing: false,
      form: {
        kanji: '',
        kana: '',
        meaning: '',
        examples: [{ japanese: '', english: '' }],
        tags: []
      },
      tagsInput: '',
      loading: false,
      error: null
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchVocabulary();
    }
  },
  methods: {
    async fetchVocabulary() {
      this.loading = true;
      try {
        const response = await vocabularyService.getById(this.id);
        const vocabulary = response.data;
        
        this.form = {
          kanji: vocabulary.kanji || '',
          kana: vocabulary.kana,
          meaning: vocabulary.meaning,
          examples: vocabulary.examples.length ? vocabulary.examples : [{ japanese: '', english: '' }],
          tags: vocabulary.tags || []
        };
        
        this.tagsInput = this.form.tags.join(', ');
      } catch (error) {
        this.error = 'Error fetching vocabulary: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    addExample() {
      this.form.examples.push({ japanese: '', english: '' });
    },
    removeExample(index) {
      this.form.examples.splice(index, 1);
      
      // Always keep at least one example
      if (this.form.examples.length === 0) {
        this.form.examples.push({ japanese: '', english: '' });
      }
    },
    async submitForm() {
      this.loading = true;
      
      // Process tags
      this.form.tags = this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      try {
        if (this.isEditing) {
          await vocabularyService.update(this.id, this.form);
        } else {
          await vocabularyService.create(this.form);
          this.resetForm();
        }
        
        this.$router.push('/vocabulary');
      } catch (error) {
        this.error = 'Error saving vocabulary: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        kanji: '',
        kana: '',
        meaning: '',
        examples: [{ japanese: '', english: '' }],
        tags: []
      };
      this.tagsInput = '';
    },
    cancel() {
      this.$router.push('/vocabulary');
    }
  }
};
</script>

<style scoped>
.vocabulary-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.example-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  position: relative;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.add-example-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
}

.add-example-btn:hover {
  background-color: #0b7dda;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.submit-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}
</style> 